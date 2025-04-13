PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`categoryId` text DEFAULT '' NOT NULL,
	`size` text NOT NULL,
	`color` text NOT NULL,
	`quantity` integer DEFAULT 40 NOT NULL,
	`price` integer NOT NULL,
	`supplierId` text,
	`createdAt` text DEFAULT '2025-04-12T13:25:31.362Z',
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`supplierId`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "categoryId", "size", "color", "quantity", "price", "supplierId", "createdAt") SELECT "id", "name", "categoryId", "size", "color", "quantity", "price", "supplierId", "createdAt" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_category` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`createdAt` text DEFAULT '2025-04-12T13:25:31.362Z',
	`updatedAt` text DEFAULT '2025-04-12T13:25:31.362Z'
);
--> statement-breakpoint
INSERT INTO `__new_category`("id", "name", "createdAt", "updatedAt") SELECT "id", "name", "createdAt", "updatedAt" FROM `category`;--> statement-breakpoint
DROP TABLE `category`;--> statement-breakpoint
ALTER TABLE `__new_category` RENAME TO `category`;--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE TABLE `__new_costumer` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`created_at` text DEFAULT '2025-04-12T13:25:31.365Z',
	`updated_at` text DEFAULT '2025-04-12T13:25:31.365Z'
);
--> statement-breakpoint
INSERT INTO `__new_costumer`("id", "name", "phone", "created_at", "updated_at") SELECT "id", "name", "phone", "created_at", "updated_at" FROM `costumer`;--> statement-breakpoint
DROP TABLE `costumer`;--> statement-breakpoint
ALTER TABLE `__new_costumer` RENAME TO `costumer`;--> statement-breakpoint
CREATE TABLE `__new_suppliers` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text,
	`notes` text,
	`createdAt` text DEFAULT '2025-04-12T13:25:31.361Z'
);
--> statement-breakpoint
INSERT INTO `__new_suppliers`("id", "name", "email", "phone", "address", "notes", "createdAt") SELECT "id", "name", "email", "phone", "address", "notes", "createdAt" FROM `suppliers`;--> statement-breakpoint
DROP TABLE `suppliers`;--> statement-breakpoint
ALTER TABLE `__new_suppliers` RENAME TO `suppliers`;