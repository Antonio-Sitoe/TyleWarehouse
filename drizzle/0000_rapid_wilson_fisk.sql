CREATE TABLE `category` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`createdAt` text DEFAULT '2025-04-12T13:00:13.858Z',
	`updatedAt` text DEFAULT '2025-04-12T13:00:13.858Z'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE TABLE `costumer` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`created_at` text DEFAULT '2025-04-12T13:00:13.862Z',
	`updated_at` text DEFAULT '2025-04-12T13:00:13.862Z'
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`categoryId` text DEFAULT '' NOT NULL,
	`size` text NOT NULL,
	`color` text NOT NULL,
	`quantity` integer DEFAULT 40 NOT NULL,
	`price` integer NOT NULL,
	`supplierId` text,
	`createdAt` text DEFAULT '2025-04-12T13:00:13.858Z',
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`supplierId`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text,
	`notes` text,
	`createdAt` text DEFAULT '2025-04-12T13:00:13.856Z'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`address` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
