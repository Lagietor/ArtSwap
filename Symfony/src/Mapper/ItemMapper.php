<?php

namespace App\Mapper;

use App\DTO\ItemDTO;
use App\Entity\NFTItem;

class ItemMapper
{
    public function mapToItemDTO(NFTItem $item): ItemDTO
    {
        $imageLink = $this->getGoogleDriveLink($item->getImage());
        $name = $item->getName();
        if (strlen($name) > 20) {
            $shortName = substr($name, 0, 20) . '...';
        } else {
            $shortName = $name;
        }

        return new ItemDTO(
            $item->getId(),
            $item->getCollection(),
            $item->getOwner(),
            $item->getName(),
            $shortName,
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