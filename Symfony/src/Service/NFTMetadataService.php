<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class NFTMetadataService
{
    private HttpClientInterface $httpClient;
    private string $pinataJwtToken;
    private string $pinataApiUrl;

    public function __construct(HttpClientInterface $httpClient, string $pinataApiUrl, string $pinataJwtToken)
    {
        $this->httpClient = $httpClient;
        $this->pinataApiUrl = $pinataApiUrl;
        $this->pinataJwtToken = $pinataJwtToken;
    }

    public function createMetadataFile($name, $value, $imageUri): string
    {
        $metadata = [
            'name' => $name,
            'description' => 'Description of ' . $name,
            'image' => $imageUri,
            'attributes' => [
                'value' => $value,
            ]
        ];

        // Save JSON metadata to a temporary file
        $tempFilePath = tempnam(sys_get_temp_dir(), 'metadata') . '.json';
        file_put_contents($tempFilePath, json_encode($metadata));

        return $tempFilePath;
    }

    public function uploadToPinata(string $filePath, string $nftName): string
    {
        if (!file_exists($filePath)) {
            throw new \Exception('File not found: ' . $filePath);
        }

        $jsonContent = file_get_contents($filePath);

        // Wyświetlenie zawartości JSON w logu lub na ekranie
        // dump($jsonContent);
        // die;

        // Przygotuj nazwę pliku na podstawie nazwy NFT
        $fileName = $nftName . '.json';  // Możesz dostosować rozszerzenie, jeśli to konieczne

        // Przygotuj dane pliku do wysyłki z nową nazwą
        $file = new \CURLFile($filePath, 'application/json', $fileName);

        // Przygotuj dane do wysyłki w formie multipart/form-data
        $multipartData = [
            'file' => $file,
        ];

        // Przygotuj cURL z odpowiednimi nagłówkami
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->pinataApiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $multipartData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->pinataJwtToken,
        ]);

        // Wykonaj zapytanie
        $response = curl_exec($ch);

        // Sprawdź status odpowiedzi
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpCode !== 200) {
            throw new \Exception("Pinata request failed with status code: " . $httpCode);
        }

        // Zamknij cURL
        curl_close($ch);

        // Przekształć odpowiedź JSON w tablicę
        $data = json_decode($response, true);

        if (isset($data['data']['cid'])) {
            return 'ipfs://' . $data['data']['cid'];
        } else {
            throw new \Exception("Pinata response did not contain cid");
        }
    }
}
