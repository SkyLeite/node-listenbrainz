import { expect } from './expect'
import { Client } from '../src'
import { Listen, ListenPayload, Track, ClientError, Response, SubmitListenPayload } from "../src/types";

describe('Create client', () => {
    var client: Client;

    beforeEach(() => {
        client = new Client();
    });

    describe('#setAuthorization', () => {
        it('should set the authorization token on the client', () => {
            client.setAuthorization('TESTKEY');
            expect(client.Authorization).to.not.be.undefined;
        });
    });

    describe('#getUserListens', () => {
        it('should return a collection of user listens', async () => {
            const result = await client.getUserListens('kxze');
            expect(result).to.be.instanceOf(Object);
        })
    })
});

// describe('Create client with authorization token', () => {
//     it('should return a Client with an Authorization token set', () => {
//         const result = new Client('TESTKEY');
//         expect(result).to.be.instanceOf(Client);
//         expect(result.Authorization).to.be.string;
//     });
// });

// describe('Set authorization on client', () => {
//     it('should mutate Client.Authorization to be a string', () => {
//         const client = new Client();
//         client.setAuthorization('TESTKEY');
//         expect(client.Authorization).to.be.string;
//     });
// });

// describe('Call getUserListens', () => {
//     it('should return a collection of listens', () => {
//         const client = new Client();
//         const result = client.getUserListens('kxze');
//         expect(result).to.be.instanceOf(Response);
//     })
// })