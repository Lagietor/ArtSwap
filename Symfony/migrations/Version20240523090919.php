<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240523090919 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE nftcollection (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, items_count INT NOT NULL, floor_price DOUBLE PRECISION NOT NULL, volume DOUBLE PRECISION NOT NULL, views INT NOT NULL, image VARCHAR(255) NOT NULL, INDEX IDX_6D3275B1A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE nftitem (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, value DOUBLE PRECISION NOT NULL, views INT NOT NULL, image VARCHAR(255) NOT NULL, INDEX IDX_AA45B88C7E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE nftcollection ADD CONSTRAINT FK_6D3275B1A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE nftitem ADD CONSTRAINT FK_AA45B88C7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE nftcollection DROP FOREIGN KEY FK_6D3275B1A76ED395');
        $this->addSql('ALTER TABLE nftitem DROP FOREIGN KEY FK_AA45B88C7E3C61F9');
        $this->addSql('DROP TABLE nftcollection');
        $this->addSql('DROP TABLE nftitem');
    }
}
