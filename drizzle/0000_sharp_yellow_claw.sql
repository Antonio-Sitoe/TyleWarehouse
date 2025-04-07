CREATE TABLE `products` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`size` text NOT NULL,
	`color` text NOT NULL,
	`quantity` integer DEFAULT 40 NOT NULL,
	`price` integer NOT NULL,
	`supplier_id` integer,
	`created_at` text DEFAULT '2025-04-07T11:27:34.858Z',
	FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text,
	`notes` text,
	`created_at` text DEFAULT '2025-04-07T11:27:34.858Z'
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
