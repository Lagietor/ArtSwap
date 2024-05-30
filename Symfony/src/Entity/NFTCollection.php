<?php

namespace App\Entity;

use App\Repository\NFTCollectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: NFTCollectionRepository::class)]
class NFTCollection
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'nFTCollections')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $itemsCount = null;

    #[ORM\Column]
    private ?float $floorPrice = null;

    #[ORM\Column]
    private ?float $volume = null;

    #[ORM\Column]
    private ?int $views = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'collection', targetEntity: NFTItem::class)]
    private Collection $nFTItems;

    public function __construct()
    {
        $this->nFTItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): static
    {
        $this->user = $user;

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

    public function getItemsCount(): ?int
    {
        return $this->itemsCount;
    }

    public function setItemsCount(int $itemsCount): static
    {
        $this->itemsCount = $itemsCount;

        return $this;
    }

    public function getFloorPrice(): ?float
    {
        return $this->floorPrice;
    }

    public function setFloorPrice(float $floorPrice): static
    {
        $this->floorPrice = $floorPrice;

        return $this;
    }

    public function getVolume(): ?float
    {
        return $this->volume;
    }

    public function setVolume(float $volume): static
    {
        $this->volume = $volume;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, NFTItem>
     */
    public function getNFTItems(): Collection
    {
        return $this->nFTItems;
    }

    public function addNFTItem(NFTItem $nFTItem): static
    {
        if (!$this->nFTItems->contains($nFTItem)) {
            $this->nFTItems->add($nFTItem);
            $nFTItem->setCollection($this);
        }

        return $this;
    }

    public function removeNFTItem(NFTItem $nFTItem): static
    {
        if ($this->nFTItems->removeElement($nFTItem)) {
            // set the owning side to null (unless already changed)
            if ($nFTItem->getCollection() === $this) {
                $nFTItem->setCollection(null);
            }
        }

        return $this;
    }
}
