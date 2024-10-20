<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241009153520 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE nftitem CHANGE image image VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD metamask_address VARCHAR(255) DEFAULT NULL, CHANGE background_image background_image VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE nftitem CHANGE image image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user DROP metamask_address, CHANGE background_image background_image VARCHAR(255) DEFAULT NULL');
    }
}
