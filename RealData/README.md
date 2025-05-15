Supabase Config and table setup
```bash
I got my supabase table data to match my original events JSON file.
It consists of having a unique ID for the table which is automatically
generated, the title, type, description, world record, and record holder.
```
How React-Query is used
```bash
I implented react-query in this assignment for fetching data from supabase,
allowing me to easily set my data in a constant, and be prepared for any 
errors that may arise when retrieving that data. If it does, it will throw
out an error message explaining what happened.
```
How AsyncStorage was used
```bash
I tried to get AsyncStorage to work correctly in my project, and I was
able to get it to save data after it was fetched, but then it got stuck 
loading constantly before the app actually built, so I had to back away
from the use of it unfortunately.
```