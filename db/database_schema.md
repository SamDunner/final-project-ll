

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

Pin_Content
- text
- images (link)


Comments

- FK map_id
- FK user_id
- description
- rating


Following
- FK following_user_id
- FK follower_user_id
