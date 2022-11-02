# What is needed?

- [x] a schema that contains users, chats and messages
- [x] a seed script that creates users, chats and message
- [ ] a frontend app that uses classic Prisma Client to read and display messages from the db
- [ ] a sidecar Prisma client that connects to a local server that polls the db to check for changes
- [ ] the frontend app also uses the sidecar client to subscribe to get new messages live

# Frontend app

- just show a list of current messages
- have a subscription that automatically updates the view with new messages

# Sidecar app methods:

- ENUM operation = ['CREATED', 'UPDATED']
- prisma_sub.message.$subscribe({operation: [operation], where: MessageWhereInput}) : Message[] to subscribe to messages.
- prisma_sub.chat.$subscribe({operation: [operation], where: ChatWhereInput}) : Chat[] to subscribe to chats.
- prisma_sub.user.$subscribe({operation: [operation], where: UserWhereInput}) : User[] to subscribe to users.
- payload to endpoint: {model, operation, where}
- payload from endpoint: {operation, model[]}

- On method call it:

1. connects to hardcoded prisma_sub endpoint
2. submits operation and where input to the endpoint
3. gets a websocket endpoint to connect to in response
4. offers some iterator magic to get the data from the websocket endpoint and close it when done

# Prisma subscription server

- exposes endpoint where it listens for subscription requests
- when a request comes in:

1. it spins off a process
2. in there it creates a websocket endpoint and sends that back to the requester
3. it retrieves the model, operation and the where from the request
4. it creates one new where per operation
   - CREATED: where: { AND: [where, createdAt_gt: timestamp] }
   - UPDATED: where: { AND: [where, updatedAt_gt: timestamp] }
5. in a 1 sec loop it:
   - resets timestamp to current time
   - queries the db once per defined operation prisma.model.findMany({where: where})
   - sends the results to the websocket endpoint if the result is non-empty {operation, model[]}
   - abort loop if the websocket endpoint is closed
