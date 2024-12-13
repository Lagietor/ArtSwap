<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241208140419 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, nft_id_id INT NOT NULL, collection_id_id INT NOT NULL, sale_price VARCHAR(255) NOT NULL, INDEX IDX_F529939838B5C0F4 (nft_id_id), INDEX IDX_F529939838BC2604 (collection_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F529939838B5C0F4 FOREIGN KEY (nft_id_id) REFERENCES nftitem (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F529939838BC2604 FOREIGN KEY (collection_id_id) REFERENCES nftcollection (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F529939838B5C0F4');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F529939838BC2604');
        $this->addSql('DROP TABLE `order`');
    }
}
