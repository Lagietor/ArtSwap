<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PersonRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PersonRepository::class)]
#[ApiResource(
    security: "is_granted('ROLE_USER')",
    normalizationContext: ['groups' => ['person:read']],
    denormalizationContext: ['groups' => ['person:write']],
    collectionOperations: [
        'get' => [
            'method' => 'GET',
            'normalization_context' => ['groups' => ['person:list']],
        ],
        'post' => [
            'method' => 'POST',
            'status_code' => 201,
        ],
    ],
    itemOperations: [
        'get' => [
            'method' => 'GET',
        ],
        'put' => [
            'method' => 'PUT',
        ],
        'delete' => [
            'method' => 'DELETE',
        ],
    ],
)]

class Person
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['person:read', 'person:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['person:read', 'person:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['person:read', 'person:write'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['person:read', 'person:write'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['person:read', 'person:write'])]
    private ?int $age = null;

    #[ORM\Column(length: 255)]
    #[Groups(['person:read', 'person:write'])]
    private ?string $gender = null;

    #[ORM\Column(length: 9, nullable: true)]
    #[Groups(['person:read', 'person:write'])]
    private ?string $phoneNumber = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
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

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): static
    {
        $this->gender = $gender;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }
}
