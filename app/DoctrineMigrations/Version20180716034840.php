<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180716034840 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content_rights_package DROP FOREIGN KEY FK_766455C484A0A3ED');
        $this->addSql('ALTER TABLE content_rights_package ADD CONSTRAINT FK_766455C484A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content ADD program_description LONGTEXT DEFAULT NULL, ADD extra_data LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\'');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP program_description, DROP extra_data');
        $this->addSql('ALTER TABLE content_rights_package DROP FOREIGN KEY FK_766455C484A0A3ED');
        $this->addSql('ALTER TABLE content_rights_package ADD CONSTRAINT FK_766455C484A0A3ED FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE CASCADE');
    }
}
