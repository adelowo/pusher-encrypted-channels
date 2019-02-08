# pusher-encrypted-channels

An introduction to end to end encryption in encrypted channels with Pusher Channels.


#### Getting started

- Clone this repository `git clone git@github.com:adelowo/pusher-encrypted-channels.git`.
- Update `server/.env` to contain your original credentials.`PUSHER_CHANNELS_ENCRYPTION_KEY` will need to be a 32 byte key. You
can generate one with `openssl rand -base64 24`
- Update `PUSHER_KEY` and `PUSHER_CLUSTER` in L81 - L82 of [client/app.js](https://github.com/adelowo/pusher-encrypted-channels/blob/master/client/app.js#L81-L82)

## Built With

- [Pusher Channels](https://pusher.com/channels) - APIs to enable devs building realtime features.
- Golang
