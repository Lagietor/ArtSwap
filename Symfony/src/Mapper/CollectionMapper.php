<?php

namespace App\Mapper;

use App\DTO\CollectionDTO;
use App\Entity\NFTCollection;

class CollectionMapper
{
    public function mapToCollectionDTO(NFTCollection $collection): CollectionDTO
    {
        $imageLink = $this->getGoogleDriveLink($collection->getImage());
        $description = $collection->getDescription();
        if (strlen($description) > 40) {
            $shortDesc = substr($description, 0, 40) . '...';
        } else {
            $shortDesc = $description;
        }

        $itemsCount = count($collection->getNFTItems());
        $floorPrice = array_reduce($collection->getNFTItems()->toArray(), function ($carry, $item) {
            if ($carry === null || $item->getValue() < $carry) {
                return $item->getValue();
            }

            return $carry;
        }, null);
        $floorPrice = $floorPrice || 0;

        return new CollectionDTO(
            $collection->getId(),
            $collection->getUser(),
            $collection->getName(),
            $itemsCount,
            $floorPrice,
            $collection->getVolume(),
            $collection->getViews(),
            $collection->getDescription(),
            $shortDesc,
            $imageLink,
            $collection->getNFTItems(),
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