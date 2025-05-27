-- Migration script for creating the navigation_items table
-- This table stores items for website navigation, allowing for hierarchical menus.

CREATE TABLE navigation_items (
    -- Unique identifier for the navigation item
    id TEXT PRIMARY KEY NOT NULL,

    -- Display name of the navigation item
    name TEXT NOT NULL,

    -- URL path for the navigation item
    path TEXT NOT NULL,

    -- Indicates if this item has a dropdown submenu
    has_dropdown BOOLEAN DEFAULT FALSE NOT NULL,

    -- Foreign key to support hierarchical navigation (parent-child relationship)
    -- If NULL, this is a top-level navigation item.
    -- ON DELETE CASCADE ensures that if a parent item is deleted, its children are also deleted.
    parent_id TEXT NULLABLE REFERENCES navigation_items(id) ON DELETE CASCADE,

    -- Order in which items should be displayed within their level (parent or root)
    sort_order INTEGER DEFAULT 0 NOT NULL,

    -- Indicates if the navigation item is currently active and should be displayed
    is_active BOOLEAN DEFAULT TRUE NOT NULL,

    -- Timestamp of when the navigation item was created
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Timestamp of when the navigation item was last updated
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on row modification
CREATE TRIGGER on_navigation_items_update
BEFORE UPDATE ON navigation_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comments to the table and columns for better understanding
COMMENT ON TABLE navigation_items IS 'Stores items for website navigation, allowing for hierarchical menus.';
COMMENT ON COLUMN navigation_items.id IS 'Unique identifier for the navigation item (e.g., UUID or a descriptive slug).';
COMMENT ON COLUMN navigation_items.name IS 'Display name of the navigation item (e.g., "Home", "Products", "About Us").';
COMMENT ON COLUMN navigation_items.path IS 'URL path for the navigation item (e.g., "/", "/products", "/about-us").';
COMMENT ON COLUMN navigation_items.has_dropdown IS 'Indicates if this item has a dropdown submenu (TRUE if it has children, FALSE otherwise).';
COMMENT ON COLUMN navigation_items.parent_id IS 'The ID of the parent navigation item, if this is a sub-item. NULL for top-level items.';
COMMENT ON COLUMN navigation_items.sort_order IS 'Determines the display order of items at the same navigation level.';
COMMENT ON COLUMN navigation_items.is_active IS 'Controls visibility of the navigation item. TRUE to display, FALSE to hide.';
COMMENT ON COLUMN navigation_items.created_at IS 'Timestamp indicating when the navigation item was first created.';
COMMENT ON COLUMN navigation_items.updated_at IS 'Timestamp indicating when the navigation item was last modified.';
COMMENT ON TRIGGER on_navigation_items_update ON navigation_items IS 'Automatically updates the updated_at timestamp whenever a row is changed.';
