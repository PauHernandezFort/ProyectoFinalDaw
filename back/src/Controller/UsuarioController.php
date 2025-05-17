<?php

namespace App\Controller;

use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

final class UsuarioController extends AbstractController
{
    #[Route('api/usuarios/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, UsuarioRepository $usuarioRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email y contraseña son obligatorios'], 400);
        }

        $usuario = $usuarioRepository->findOneBy(['correo' => $email]);

        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404);
        }

        if (!password_verify($password, $usuario->getPassword())) {
            return new JsonResponse(['error' => 'Contraseña incorrecta'], 401);
        }

        return new JsonResponse([
            'mensaje' => 'Login correcto',
            'usuario' => [
                'id' => $usuario->getId(),
                'email' => $usuario->getCorreo(),
                'nombre' => $usuario->getUsername(),
            ]
        ]);
    }
  


}
