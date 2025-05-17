<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class NotificacionesController extends AbstractController
{
    #[Route('/notificaciones', name: 'app_notificaciones')]
    public function index(): Response
    {
        return $this->render('notificaciones/index.html.twig', [
            'controller_name' => 'NotificacionesController',
        ]);
    }
}
