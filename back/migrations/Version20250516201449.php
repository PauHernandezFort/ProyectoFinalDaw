<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250516201449 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE chat DROP FOREIGN KEY FK_659DF2AAD3A1383C
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE chat DROP FOREIGN KEY FK_659DF2AA8B1C8904
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE mensaje DROP FOREIGN KEY FK_9B631D017E3973CC
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE mensaje DROP FOREIGN KEY FK_9B631D01D5EDFE14
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE chat
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE mensaje
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE chat (id INT AUTO_INCREMENT NOT NULL, usuaio_1_id INT DEFAULT NULL, usuario_2_id INT DEFAULT NULL, INDEX IDX_659DF2AAD3A1383C (usuaio_1_id), INDEX IDX_659DF2AA8B1C8904 (usuario_2_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE mensaje (id INT AUTO_INCREMENT NOT NULL, remitente_id_id INT DEFAULT NULL, chat_id_id INT DEFAULT NULL, contenido VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, fecha_envio DATE DEFAULT NULL, INDEX IDX_9B631D017E3973CC (chat_id_id), INDEX IDX_9B631D01D5EDFE14 (remitente_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE chat ADD CONSTRAINT FK_659DF2AAD3A1383C FOREIGN KEY (usuaio_1_id) REFERENCES usuario (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE chat ADD CONSTRAINT FK_659DF2AA8B1C8904 FOREIGN KEY (usuario_2_id) REFERENCES usuario (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE mensaje ADD CONSTRAINT FK_9B631D017E3973CC FOREIGN KEY (chat_id_id) REFERENCES chat (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE mensaje ADD CONSTRAINT FK_9B631D01D5EDFE14 FOREIGN KEY (remitente_id_id) REFERENCES usuario (id)
        SQL);
    }
}
