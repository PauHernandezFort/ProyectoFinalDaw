<?php

namespace App\Entity;

use App\Repository\AnunciosRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Exception;

#[ORM\Entity(repositoryClass: AnunciosRepository::class)]
#[ApiResource]
class Anuncios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titulo = null;

    #[ORM\Column(length: 255)]
    private ?string $descripcion = null;

    #[ORM\ManyToOne(inversedBy: 'anuncios')]
    private ?Usuario $usuario_id = null;

    #[ORM\Column(length: 255)]
    private ?string $estado = null;

    #[ORM\Column]
    private ?int $precio = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tipo = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fechaCreacion = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\Column(type: 'float', nullable: true)]
    private ?float $lat = null;

    #[ORM\Column(type: 'float', nullable: true)]
    private ?float $lng = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagen = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $correo = null;

    #[ORM\Column(nullable: true)]
    private ?int $telefono = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): static
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getUsuarioId(): ?Usuario
    {
        return $this->usuario_id;
    }

    public function setUsuarioId(?Usuario $usuario_id): static
    {
        $this->usuario_id = $usuario_id;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): static
    {
        $this->estado = $estado;

        return $this;
    }

    public function getPrecio(): ?int
    {
        return $this->precio;
    }

    public function setPrecio(int $precio): static
    {
        $this->precio = $precio;

        return $this;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(?string $tipo): static
    {
        $this->tipo = $tipo;

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

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(?\DateTimeInterface $fecha): static
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $lat): static
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(?float $lng): static
    {
        $this->lng = $lng;

        return $this;
    }

    public function setImagen(?string $imagen): static
    {
        if ($imagen) {
      
            $imageData = explode(',', $imagen);
            if (count($imageData) > 1) {
         
                $base64Image = $imageData[1];
        
                // Decodificar la imagen base64
                $imageBinary = base64_decode($base64Image);
        
         
                $imageInfo = getimagesizefromstring($imageBinary);
                if ($imageInfo === false) {
                    throw new Exception('El archivo no es una imagen válida.');
                }
        
   
                $mimeType = $imageInfo['mime'];
                $extension = '';
                switch ($mimeType) {
                    case 'image/jpeg':
                        $extension = '.jpg';
                        break;
                    case 'image/png':
                        $extension = '.png';
                        break;
                    case 'image/gif':
                        $extension = '.gif';
                        break;
                    default:
                        throw new Exception('Tipo de imagen no soportado.');
                }
        
               
                $imageName = uniqid('imagen_', true) . $extension;
        
             
                $uploadDir = __DIR__ . '/../../public/images/anuncios/';  
                $imagePath = $uploadDir . $imageName;
        
              
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);  
                }
        
        
                file_put_contents($imagePath, $imageBinary);
        
                $this->imagen = 'images/anuncios/' . $imageName;
            }
        }
    
        return $this;
    }

    // Método para obtener la ruta de la imagen
    public function getImagen(): ?string
    {
        return $this->imagen;
    }

    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    public function setCorreo(?string $correo): static
    {
        $this->correo = $correo;

        return $this;
    }

    public function getTelefono(): ?int
    {
        return $this->telefono;
    }

    public function setTelefono(?int $telefono): static
    {
        $this->telefono = $telefono;

        return $this;
    }
}
