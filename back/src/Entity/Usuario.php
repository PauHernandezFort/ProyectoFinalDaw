<?php
// src/Entity/Usuario.php

namespace App\Entity;

use App\Repository\UsuarioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface; // Para la encriptación


#[ORM\Entity(repositoryClass: UsuarioRepository::class)]
#[ApiResource]
class Usuario
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $correo = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fechaCreacion = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $descripcion = null;

    #[ORM\Column]
    private ?int $puntuacion = null;

    #[ORM\Column(nullable: true)]
    private ?int $numOfertas = null;

    #[ORM\Column(nullable: true)]
    private ?int $numTrabajos = null;

    // Campo de contraseña
    #[ORM\Column(length: 255)]
    private ?string $password = null;

    /**
     * @var Collection<int, Anuncios>
     */
    #[ORM\OneToMany(targetEntity: Anuncios::class, mappedBy: 'usuario_id')]
    private Collection $anuncios;

    /**
     * @var Collection<int, Notificaciones>
     */
    #[ORM\OneToMany(targetEntity: Notificaciones::class, mappedBy: 'emisor')]
    private Collection $emisor;

 

   

  
    public function __construct()
    {
        $this->anuncios = new ArrayCollection();
        $this->emisor = new ArrayCollection();
    
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
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

    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    public function setCorreo(string $correo): static
    {
        $this->correo = $correo;

        return $this;
    }

    public function getFechaCreacion(): ?\DateTimeInterface
    {
        return $this->fechaCreacion;
    }

    public function setFechaCreacion(\DateTimeInterface $fechaCreacion): static
    {
        $this->fechaCreacion = $fechaCreacion;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getPuntuacion(): ?int
    {
        return $this->puntuacion;
    }

    public function setPuntuacion(int $puntuacion): static
    {
        $this->puntuacion = $puntuacion;

        return $this;
    }

    public function getNumOfertas(): ?int
    {
        return $this->numOfertas;
    }

    public function setNumOfertas(?int $numOfertas): static
    {
        $this->numOfertas = $numOfertas;

        return $this;
    }

    public function getNumTrabajos(): ?int
    {
        return $this->numTrabajos;
    }

    public function setNumTrabajos(?int $numTrabajos): static
    {
        $this->numTrabajos = $numTrabajos;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = password_hash($password, PASSWORD_BCRYPT);

        return $this;
    }

    /**
     * @return Collection<int, Anuncios>
     */
    public function getAnuncios(): Collection
    {
        return $this->anuncios;
    }

    public function addAnuncio(Anuncios $anuncio): static
    {
        if (!$this->anuncios->contains($anuncio)) {
            $this->anuncios->add($anuncio);
            $anuncio->setUsuarioId($this);
        }

        return $this;
    }

    public function removeAnuncio(Anuncios $anuncio): static
    {
        if ($this->anuncios->removeElement($anuncio)) {
            // set the owning side to null (unless already changed)
            if ($anuncio->getUsuarioId() === $this) {
                $anuncio->setUsuarioId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Notificaciones>
     */
    public function getEmisor(): Collection
    {
        return $this->emisor;
    }

    public function addEmisor(Notificaciones $emisor): static
    {
        if (!$this->emisor->contains($emisor)) {
            $this->emisor->add($emisor);
            $emisor->setEmisor($this);
        }

        return $this;
    }

    public function removeEmisor(Notificaciones $emisor): static
    {
        if ($this->emisor->removeElement($emisor)) {
            if ($emisor->getEmisor() === $this) {
                $emisor->setEmisor(null);
            }
        }

        return $this;
    }


    /**
     * @return Collection<int, Mensaje>
     */
   

 

 
}
