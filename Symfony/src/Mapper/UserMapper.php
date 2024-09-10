<?php

namespace App\Mapper;

use App\DTO\UserDTO;
use App\Entity\User;

class UserMapper
{
    public function mapToUserDTO(User $user): UserDTO
    {
        $profileImageLink = $this->getGoogleDriveLink($user->getProfileImage());
        $backgroundImageLink = $this->getGoogleDriveLink($user->getBackgroundImage());
        $collectionsCount = count($user->getNFTCollections());
        $itemsCount = count($user->getNFTItems());

        return new UserDTO(
            $user->getId(),
            $user->getEmail(),
            $user->getRoles(),
            $user->getUsername(),
            $collectionsCount,
            $itemsCount,
            $profileImageLink,
            $backgroundImageLink,
            $user->getNFTCollections(),
            $user->getNFTItems(),
        );
    }

    private function getGoogleDriveLink($fileId)
    {
        if ($fileId) {
            try {
                $thumbnailLink = "https://drive.google.com/thumbnail?id={$fileId}&sz=w1000";
                return $thumbnailLink;
            } catch (\Exception $e) {
                return null;
            }
        }
        return null;
    }
}