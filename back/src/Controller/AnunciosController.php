<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AnunciosController extends AbstractController
{
    #[Route('/anuncios/login{id}', name: 'app_anuncios')]
    public function login( $id): Response
    {


    
    }
}
