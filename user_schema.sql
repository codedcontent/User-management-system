CREATE TABLE `user_management_system`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `comments` TEXT NOT NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'active',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

mysql://root:mvfcfVk7H1AXu7E5LsJp@containers-us-west-85.railway.app:5547/railway