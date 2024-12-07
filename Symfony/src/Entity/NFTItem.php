<?php

namespace App\Entity;

use App\Repository\NFTItemRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: NFTItemRepository::class)]
class NFTItem
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'nFTItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?NFTCollection $collection = null;

    #[ORM\ManyToOne(inversedBy: 'nFTItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $owner = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?float $value = null;

    #[ORM\Column]
    private ?int $views = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(type: Types::BIGINT)]
    private ?string $tokenId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCollection(): ?NFTCollection
    {
        return $this->collection;
    }

    public function setCollection(?NFTCollection $collection): static
    {
        $this->collection = $collection;

        return $this;
    }

    public function getOwner(): ?user
    {
        return $this->owner;
    }

    public function setOwner(?user $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(float $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getViews(): ?int
    {
        return $this->views;
    }

    public function setViews(int $views): static
    {
        $this->views = $views;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getTokenId(): ?string
    {
        return $this->tokenId;
    }

    public function setTokenId(string $tokenId): static
    {
        $this->tokenId = $tokenId;

        return $this;
    }
}
