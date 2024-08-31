<?php

namespace App\Mapper;

use App\DTO\ItemDTO;
use App\Entity\NFTItem;

class ItemMapper
{
    public function mapToItemDTO(NFTItem $item): ItemDTO
    {
        $imageLink = $this->getGoogleDriveLink($item->getImage());

        return new ItemDTO(
            $item->getId(),
            $item->getCollection(),
            $item->getOwner(),
            $item->getName(),
            $item->getValue(),
            $item->getViews(),
            $imageLink
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