INSERT INTO "items" (name, bio, image, category, subcategory, isvegan, cost, availability) 
VALUES 
('Veg Burger', 'Delicious veggie burger', 'https://images.pexels.com/photos/6605397/pexels-photo-6605397.jpeg?auto=compress&cs=tinysrgb&w=600', 'Fast Food', 'Burgers', true, 150, true),
('Chicken Pizza', 'Cheesy chicken pizza', 'https://images.pexels.com/photos/29839587/pexels-photo-29839587/free-photo-of-delicious-bbq-chicken-pizza-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=600', 'Fast Food', 'Pizza', false, 300, true),
('Pasta Alfredo', 'Creamy alfredo pasta', 'https://images.pexels.com/photos/23286041/pexels-photo-23286041/free-photo-of-alfredo-pasta-italian-and-american-classic-dish-cheesy-pasta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Italian', 'Pasta', false, 200, true),
('Garden Salad', 'Fresh vegetable salad', 'https://images.pexels.com/photos/30900417/pexels-photo-30900417/free-photo-of-vibrant-tuna-salad-with-soft-boiled-eggs.jpeg?auto=compress&cs=tinysrgb&w=600', 'Salad', 'Vegetarian', true, 100, true),
('Mango Smoothie', 'Refreshing mango smoothie', 'https://images.pexels.com/photos/6493405/pexels-photo-6493405.jpeg?auto=compress&cs=tinysrgb&w=600', 'Beverages', 'Smoothies', true, 120, true);


INSERT INTO "orders" ("tableId", "totalCost") 
VALUES 
(1, 500),
(2, 400),
(3, 300),
(4, 200),
(5, 120);



INSERT INTO "cart" ("orderId", "itemId", quantity) 
VALUES 
(1, 1, 1),
(1, 2, 1),
(2, 3, 1),
(3, 4, 1),
(4, 5, 1);




INSERT INTO "users" ("userId", username, password, "isAdmin") 
VALUES 
(1, 'JohnDoe', 'password123', false),
(2, 'JaneSmith', 'password456', true),
(3, 'MichaelBrown', 'password789', false),
(4, 'EmilyDavis', 'password101', false),
(5, 'ChrisWilson', 'password202', true);
