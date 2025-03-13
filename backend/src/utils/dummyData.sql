-- Insert bulk data into 'items' table
INSERT INTO items (name, bio, image, category, subcategory, isvegan, cost, availability, tags, ingredients)
VALUES
('Vegan Spring Rolls', 'Crispy vegan spring rolls with dipping sauce.', '/assets/Vegan-Spring-Rolls.png', 'Appetizers', 'Vegan', true, 8, true, ARRAY['vegan', 'appetizer', 'crispy'], ARRAY['spring roll wrapper', 'tofu', 'carrot', 'lettuce']),
('Tomato Soup', 'Creamy tomato soup with a touch of basil.', '/asstes/Tomato-Soup.webp', 'Soups', 'Vegan', true, 6, true, ARRAY['vegan', 'soup', 'tomato'], ARRAY['tomatoes', 'basil', 'garlic', 'olive oil']),
('Caesar Salad', 'Classic Caesar salad with creamy dressing and croutons.', '/assets/Caesar-Salad.jpg', 'Salads', 'Non-Vegan', false, 12, true, ARRAY['salad', 'caesar', 'non-vegan'], ARRAY['romaine lettuce', 'caesar dressing', 'croutons', 'parmesan']),
('Grilled Chicken', 'Juicy grilled chicken served with herbs and spices.', '/assets/Grilled-Chicken.jpg', 'Entrees', 'Non-Vegan', false, 18, true, ARRAY['entree', 'chicken', 'grilled'], ARRAY['chicken breast', 'olive oil', 'garlic', 'herbs']),
('French Fries', 'Crispy French fries with a side of ketchup.', '/assets/French-Fries.jpg', 'Sides', 'Non-Vegan', false, 5, true, ARRAY['side', 'fries', 'crispy'], ARRAY['potatoes', 'salt', 'oil']),
('Chocolate Cake', 'Decadent chocolate cake with rich frosting.', '/assets/Chocolate-Cake.jpg', 'Desserts', 'Non-Vegan', false, 7, true, ARRAY['dessert', 'chocolate', 'cake'], ARRAY['flour', 'cocoa powder', 'butter', 'sugar']),
('Lemonade', 'Freshly squeezed lemonade with a hint of mint.', '/assets/Lemonade.jpg', 'Beverages', 'Vegan', true, 4, true, ARRAY['beverage', 'lemon', 'mint'], ARRAY['lemons', 'water', 'mint', 'sugar']),
('Vegan Tacos', 'Delicious vegan tacos with plant-based fillings.', '/assets/Vegan-Tacos.jpg', 'Appetizers', 'Vegan', true, 9, true, ARRAY['vegan', 'appetizer', 'taco'], ARRAY['taco shell', 'tofu', 'lettuce', 'tomato']),
('Minestrone Soup', 'Hearty vegetable soup with pasta and beans.', '/assets/Minestrone-Soup.webp', 'Soups', 'Vegan', true, 7, true, ARRAY['vegan', 'soup', 'vegetable'], ARRAY['carrot', 'celery', 'beans', 'pasta', 'tomatoes']),
('Greek Salad', 'A fresh Greek salad with olives, cucumber, and feta cheese.', '/assets/Greek-Salad.jpg', 'Salads', 'Non-Vegan', false, 10, true, ARRAY['salad', 'greek', 'feta'], ARRAY['cucumber', 'tomato', 'feta', 'olives', 'red onion']),
('Vegan Burger', 'A delicious vegan burger with fresh veggies.', '/assets/Vegan-Burger.jpg', 'Entrees', 'Vegan', true, 12, true, ARRAY['vegan', 'burger', 'healthy'], ARRAY['lettuce', 'tomato', 'vegan patty', 'bun']),
('Mashed Potatoes', 'Creamy mashed potatoes with a side of gravy.', '/assets/Mashed-Potatoes.avif', 'Sides', 'Non-Vegan', false, 6, true, ARRAY['side', 'potato', 'mashed'], ARRAY['potatoes', 'butter', 'cream', 'salt']),
('Cheesecake', 'Rich and creamy cheesecake topped with berries.', '/assets/Cheesecake.jpg', 'Desserts', 'Non-Vegan', false, 8, true, ARRAY['dessert', 'cheese', 'cake'], ARRAY['cream cheese', 'sugar', 'butter', 'berries']),
('Iced Coffee', 'Refreshing iced coffee with a splash of milk.', '/assets/Iced-Coffee.jpg', 'Beverages', 'Non-Vegan', false, 5, true, ARRAY['beverage', 'coffee', 'cold'], ARRAY['coffee', 'milk', 'sugar']),
('Fried Calamari', 'Golden fried calamari with tangy marinara sauce.', '/assets/Fried-Calamari.jpg', 'Appetizers', 'Non-Vegan', false, 11, true, ARRAY['appetizer', 'seafood', 'fried'], ARRAY['calamari', 'flour', 'oil', 'marinara sauce']),
('Chicken Noodle Soup', 'Classic chicken noodle soup with tender chicken.', '/assets/Chicken-Noodle-Soup.jpg', 'Soups', 'Non-Vegan', false, 8, true, ARRAY['soup', 'chicken', 'noodle'], ARRAY['chicken', 'noodles', 'carrot', 'celery', 'broth']),
('Caprese Salad', 'Tomato, mozzarella, and basil with balsamic glaze.', '/assets/Caprese-Salad.webp', 'Salads', 'Non-Vegan', false, 9, true, ARRAY['salad', 'caprese', 'tomato'], ARRAY['tomato', 'mozzarella', 'basil', 'balsamic glaze']),
('Steak', 'Juicy grilled steak served with garlic butter.', '/assets/Steak.avif', 'Entrees', 'Non-Vegan', false, 25, true, ARRAY['entree', 'steak', 'grilled'], ARRAY['beef steak', 'butter', 'garlic', 'rosemary']),
('Onion Rings', 'Crispy onion rings with a side of dipping sauce.', '/assets/Onion-Rings.jpg', 'Sides', 'Non-Vegan', false, 6, true, ARRAY['side', 'onion', 'crispy'], ARRAY['onions', 'flour', 'oil', 'salt']),
('Tiramisu', 'Classic Italian tiramisu with coffee-soaked layers.', '/assets/Tiramisu.jpg', 'Desserts', 'Non-Vegan', false, 7, true, ARRAY['dessert', 'italian', 'coffee'], ARRAY['ladyfingers', 'mascarpone', 'coffee', 'cocoa powder']),
('Hot Chocolate', 'Warm and creamy hot chocolate with whipped cream.', '/assets/Hot-Chocolate.jpg', 'Beverages', 'Non-Vegan', false, 4, true, ARRAY['beverage', 'chocolate', 'warm'], ARRAY['chocolate', 'milk', 'sugar', 'whipped cream']);

-- Insert bulk data into 'category' table
INSERT INTO category (name, images, slug, description)
VALUES
('Appetizers', '/assets/Appetizers.jpg', 'appetizers',''),
('Soups', '/assets/Soups.jpg', 'soups',''),
('Salads', '/assets/Salads.jpg', 'salads',''),
('Entrees', '/assets/Entrees.jpg', 'entrees',''),
('Sides', '/assets/Sides.jpg', 'sides',''),
('Desserts', '/assets/Desserts.jpg', 'desserts',''),
('Beverages', '/assets/Beverages.jpeg', 'beverages','');

-- Insert bulk data into 'orders' table
INSERT INTO orders ("tableId", "totalCost", "createdAt", status)
VALUES
(1, 95, '2025-03-09T14:30:00.000Z', 'PENDING'),
(2, 78, '2025-03-09T15:00:00.000Z', 'PENDING');

-- Insert bulk data into 'cart' table (mapping orders and items)
-- Order 1
INSERT INTO cart ("orderId", "itemId", quantity)
VALUES
(1, 1, 2), -- Vegan Spring Rolls
(1, 2, 1), -- Tomato Soup
(1, 3, 1), -- Caesar Salad
(1, 4, 1), -- Grilled Chicken
(1, 5, 1), -- French Fries
(1, 6, 1); -- Chocolate Cake

-- Order 2
INSERT INTO cart ("orderId", "itemId", quantity)
VALUES
(2, 7, 1), -- Vegan Tacos
(2, 8, 1), -- Minestrone Soup
(2, 9, 1), -- Greek Salad
(2, 10, 1), -- Vegan Burger
(2, 11, 1), -- Mashed Potatoes
(2, 12, 1); -- Cheesecake



INSERT INTO users (username, password, "isAdmin")
VALUES
('john_doe', 'hashed_password_1', true),
('jane_smith', 'hashed_password_2', false),
('alice_jones', 'hashed_password_3', false),
('bob_williams', 'hashed_password_4', false),
('carla_martin', 'hashed_password_5', true),
('dave_brown', 'hashed_password_6', false),
('emily_white', 'hashed_password_7', false),
('frank_green', 'hashed_password_8', true),
('grace_clark', 'hashed_password_9', false),
('hannah_wright', 'hashed_password_10', true);



