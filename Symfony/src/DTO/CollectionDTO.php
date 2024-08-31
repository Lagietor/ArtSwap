<?php

namespace App\DTO;

class CollectionDTO
{
    private $id;
    private $user;
    private $name;
    private $itemsCount;
    private $floorPrice;
    private $volume;
    private $views;
    private $description;
    private $shortDescription;
    private $image;
    private $nftItems;

    public function __construct($id, $user, $name, $itemsCount, $floorPrice, $volume, $views, $description, $shortDescription, $image, $nftItems)
    {
        $this->id = $id;
        $this->user = $user;
        $this->name = $name;
        $this->itemsCount = $itemsCount;
        $this->floorPrice = $floorPrice;
        $this->volume = $volume;
        $this->views = $views;
        $this->description = $description;
        $this->shortDescription = $shortDescription;
        $this->image = $image;
        $this->nftItems = $nftItems;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getItemsCount()
    {
        return $this->itemsCount;
    }

    public function getFloorPrice()
    {
        return $this->floorPrice;
    }

    public function getVolume()
    {
        return $this->volume;
    }

    public function getViews()
    {
        return $this->views;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getShortDescription()
    {
        return $this->shortDescription;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getNftItems()
    {
        return $this->nftItems;
    }
}