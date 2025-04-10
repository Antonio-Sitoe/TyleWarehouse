CREATE TABLE `costumer` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`created_at` text DEFAULT '2025-04-10T20:29:57.541Z',
	`updated_at` text DEFAULT '2025-04-10T20:29:57.541Z'
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`size` text NOT NULL,
	`color` text NOT NULL,
	`quantity` integer DEFAULT 40 NOT NULL,
	`price` integer NOT NULL,
	`supplier_id` integer,
	`created_at` text DEFAULT '2025-04-10T20:29:57.552Z',
	FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "category", "size", "color", "quantity", "price", "supplier_id", "created_at") SELECT "id", "name", "category", "size", "color", "quantity", "price", "supplier_id", "created_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_suppliers` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text,
	`notes` text,
	`created_at` text DEFAULT '2025-04-10T20:29:57.552Z'
);
--> statement-breakpoint
INSERT INTO `__new_suppliers`("id", "name", "email", "phone", "address", "notes", "created_at") SELECT "id", "name", "email", "phone", "address", "notes", "created_at" FROM `suppliers`;--> statement-breakpoint
DROP TABLE `suppliers`;--> statement-breakpoint
ALTER TABLE `__new_suppliers` RENAME TO `suppliers`;