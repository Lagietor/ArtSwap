<?php

namespace App\DTO;

class ItemDTO
{
    private $id;
    private $collection;
    private $owner;
    private $name;
    private $value;
    private $views;
    private $image;

    public function __construct($id, $collection, $owner, $name, $value, $views, $image)
    {
        $this->id = $id;
        $this->collection = $collection;
        $this->owner = $owner;
        $this->name = $name;
        $this->value = $value;
        $this->views = $views;
        $this->image = $image;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getCollection()
    {
        return $this->collection;
    }

    public function getOwner()
    {
        return $this->owner;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function getViews()
    {
        return $this->views;
    }

    public function getImage()
    {
        return $this->image;
    }
}