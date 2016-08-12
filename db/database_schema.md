 

Users
- first_name 
- last_name   
- username         
- email         
- password 
- created_at     
- updated_at   


Users_Maps

- FK user_id
- FK map_id

Favorites
- FK user_id
- FK map_id


Maps
- title
- location
- latitude
- longitude
- privacy
- published 
- created_at 
- updated_at  


Pins
- title
- rating
- sort_id
- latitude
- longitude
- created_at
- updated_at 

- FK map_id
- FK author_id (users)

Pin_Content
- text
- images (link)
- FK pin_id


Comments

- FK map_id
- FK user_id
- description
- rating
- created_at 
- updated_at 


Followings
- FK following_user_id
- FK follower_user_id









