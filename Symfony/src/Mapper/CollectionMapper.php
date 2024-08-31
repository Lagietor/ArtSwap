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

        return new CollectionDTO(
            $collection->getId(),
            $collection->getUser(),
            $collection->getName(),
            $collection->getItemsCount(),
            $collection->getFloorPrice(),
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