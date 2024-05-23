<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(message: 'Email is required')]
    #[Assert\Email(message: 'Incorrect email')]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\Length(
        min: 6,
        minMessage: 'Password must have at least 6 characters'
    )]
    #[Assert\Regex(
        pattern: '/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/',
        message: 'Password must contain at least one uppercase letter, one digit, and one special character'
    )]
    private ?string $password = null;

    #[ORM\Column(length: 50)]
    #[Assert\Length(
        min: 3,
        max: 50,
        minMessage: 'Username must have at least 3 characters',
        maxMessage: 'Username must have less than 50 characters'
    )]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: NFTCollection::class)]
    private Collection $nFTCollections;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: NFTItem::class)]
    private Collection $nFTItems;

    public function __construct()
    {
        $this->nFTCollections = new ArrayCollection();
        $this->nFTItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection<int, NFTCollection>
     */
    public function getNFTCollections(): Collection
    {
        return $this->nFTCollections;
    }

    public function addNFTCollection(NFTCollection $nFTCollection): static
    {
        if (!$this->nFTCollections->contains($nFTCollection)) {
            $this->nFTCollections->add($nFTCollection);
            $nFTCollection->setUser($this);
        }

        return $this;
    }

    public function removeNFTCollection(NFTCollection $nFTCollection): static
    {
        if ($this->nFTCollections->removeElement($nFTCollection)) {
            // set the owning side to null (unless already changed)
            if ($nFTCollection->getUser() === $this) {
                $nFTCollection->setUser(null);
            }
        }

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
            $nFTItem->setOwner($this);
        }

        return $this;
    }

    public function removeNFTItem(NFTItem $nFTItem): static
    {
        if ($this->nFTItems->removeElement($nFTItem)) {
            // set the owning side to null (unless already changed)
            if ($nFTItem->getOwner() === $this) {
                $nFTItem->setOwner(null);
            }
        }

        return $this;
    }
}
