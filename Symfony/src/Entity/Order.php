<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?NftItem $NftId = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?NftCollection $collectionId = null;

    #[ORM\Column(length: 255)]
    private ?string $salePrice = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNftId(): ?NftItem
    {
        return $this->NftId;
    }

    public function setNftId(?NftItem $NftId): static
    {
        $this->NftId = $NftId;

        return $this;
    }

    public function getCollectionId(): ?NftCollection
    {
        return $this->collectionId;
    }

    public function setCollectionId(?NftCollection $collectionId): static
    {
        $this->collectionId = $collectionId;

        return $this;
    }

    public function getSalePrice(): ?string
    {
        return $this->salePrice;
    }

    public function setSalePrice(string $salePrice): static
    {
        $this->salePrice = $salePrice;

        return $this;
    }
}
