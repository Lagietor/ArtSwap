<?php

namespace App\DTO;

class UserDTO
{
    private $id;
    private $email;
    private $roles;
    private $username;
    private $profileImage;
    private $backgroundImage;
    private $nftCollections;
    private $nftItems;

    public function __construct(
        $id, 
        $email, 
        $roles, 
        $username, 
        $profileImageLink, 
        $backgroundImageLink,
        $nftCollections,
        $nftItems
    )
    {
        $this->id = $id;
        $this->email = $email;
        $this->roles = $roles;
        $this->username = $username;
        $this->profileImage = $profileImageLink;
        $this->backgroundImage = $backgroundImageLink;
        $this->nftCollections = $nftCollections;
        $this->nftItems = $nftItems;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getRoles()
    {
        return $this->roles;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getProfileImage()
    {
        return $this->profileImage;
    }

    public function getBackgroundImage()
    {
        return $this->backgroundImage;
    }

    public function getNftCollections()
    {
        return $this->nftCollections;
    }

    public function getNftItems()
    {
        return $this->nftItems;
    }
}