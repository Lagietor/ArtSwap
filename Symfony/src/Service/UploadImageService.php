<?php

namespace App\Service;

use Google\Client;
use Google\Service\Drive;
use Symfony\Component\HttpKernel\KernelInterface;

class UploadImageService 
{
    private Client $client;
    private Drive $service;
    private string $projectDir;

    public function __construct(KernelInterface $kernel)
    {
        $this->projectDir = $kernel->getProjectDir();

        $this->client = new Client();
        $this->client->setAuthConfig($this->projectDir . '/google/artswap-933e3f8bce95.json');
        $this->client->addScope(Drive::DRIVE);
        $this->service = new Drive($this->client);
    }

    public function uploadFileToStorage(string $userName, string $fileType, $file): int
    {
        $artSwapFolderId = $this->ensureFolderExists('ArtSwap');
        
        $userFolderId = $this->ensureFolderExists($userName, $artSwapFolderId);
        
        $subFolderName = $this->getSubFolderName($fileType);
        $subFolderId = $this->ensureFolderExists($subFolderName, $userFolderId);

        $fileMetadata = new Drive\DriveFile([
            'name' => $file->getClientOriginalName(),
            'parents' => [$subFolderId],
        ]);

        $content = file_get_contents($file->getPathname());

        $uploadedFile = $this->service->files->create($fileMetadata, [
            'data' => $content,
            'mimeType' => $file->getMimeType(),
            'uploadType' => 'multipart',
            'fields' => 'id'
        ]);

        return $uploadedFile->id;
    }

    private function ensureFolderExists(string $folderName, ?string $parentId = null): string
    {
        $folderId = $this->findFolderIdByName($folderName, $parentId);
        if (!$folderId) {
            $folderId = $this->createFolder($folderName, $parentId);
        }
        return $folderId;
    }

    private function createFolder(string $folderName, ?string $parentId = null): string
    {
        $fileMetadata = new Drive\DriveFile([
            'name' => $folderName,
            'mimeType' => 'application/vnd.google-apps.folder',
            'parents' => $parentId ? [$parentId] : [],
        ]);

        $folder = $this->service->files->create($fileMetadata, [
            'fields' => 'id'
        ]);

        return $folder->id;
    }

    private function findFolderIdByName(string $folderName, ?string $parentId = null): ?string
    {
        $query = "mimeType='application/vnd.google-apps.folder' and name='$folderName' and trashed=false";
        if ($parentId) {
            $query .= " and '$parentId' in parents";
        }

        $response = $this->service->files->listFiles([
            'q' => $query,
            'fields' => 'files(id, name)',
        ]);

        return $response->files[0]->id ?? null;
    }

    private function getSubFolderName(string $fileType): string
    {
        switch ($fileType) {
            case 'profileImage':
                return 'ProfilePictures';
            case 'backgroundImage':
                return 'Backgrounds';
            default:
                throw new \InvalidArgumentException("Unsupported file type: $fileType");
        }
    }
}