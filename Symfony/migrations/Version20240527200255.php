<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240527200255 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE nftitem ADD collection_id INT NOT NULL');
        $this->addSql('ALTER TABLE nftitem ADD CONSTRAINT FK_AA45B88C514956FD FOREIGN KEY (collection_id) REFERENCES nftcollection (id)');
        $this->addSql('CREATE INDEX IDX_AA45B88C514956FD ON nftitem (collection_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE nftitem DROP FOREIGN KEY FK_AA45B88C514956FD');
        $this->addSql('DROP INDEX IDX_AA45B88C514956FD ON nftitem');
        $this->addSql('ALTER TABLE nftitem DROP collection_id');
    }
}
