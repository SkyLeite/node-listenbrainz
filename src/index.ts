import fetch from 'node-fetch';
import { Listen, ListenPayload, Track, ClientError, Response, SubmitListenPayload } from "./types";

export class Client {
    BaseURL: string;
    Authorization?: string;

    constructor(Authorization?: string, BaseURL?: string) {
        this.BaseURL = BaseURL || 'https://api.listenbrainz.org/';
        this.Authorization = Authorization;
    }

    setAuthorization(Authorization: string) {
        this.Authorization = Authorization;
    }

    async getUserListens(user: string, options?: object) {
        let r = await fetch(this.BaseURL + `1/user/${user}/listens`);
        if (r.status === 200) {
            let data = await r.json();

            let payload: ListenPayload = {
                count: data.payload.count,
                listens: data.payload.listens.map((i: any) => {
                    let listen: Listen = {
                        listened_at: i.listened_at,
                        recording_msid: i.recording_msid,
                        track_metadata: {
                            artist_name: i.track_metadata.artist_name,
                            track_name: i.track_metadata.track_name,
                            release_name: i.track_metadata.additional_info.release_name,
                            artist_mbids: i.track_metadata.additional_info.artist_mbids,
                            artist_msid: i.track_metadata.additional_info.artist_msid,
                            recording_mbid: i.track_metadata.additional_info.recording_mbid,
                            release_mbid: i.track_metadata.additional_info.release_mbid,
                            release_msid: i.track_metadata.additional_info.release_msid,
                            tags: i.track_metadata.additional_info.tags,
                        },
                    }
                    return listen.track_metadata;
                })
            }

            let response: Response = {
                RateLimit: {
                    Limit: parseInt(r.headers.get('x-ratelimit-limit')),
                    Remaining: parseInt(r.headers.get('x-ratelimit-remaining')),
                    Reset: parseInt(r.headers.get('x-ratelimit-reset')),
                    ResetIn: parseInt(r.headers.get('x-ratelimit-reset-in')),
                },
                Payload: payload
            }

            return response;
        }
        else if (r.status === 429) {
            throw 'hello';
        }
    }

    async getLatestImport(user: string, options?: object) {
        let r = await fetch(this.BaseURL + `1/latest-import?user_name=${user}`);
        if (r.status === 200) {
            return await r.json();
        }
    }

    async submitListen(data: SubmitListenPayload) {
        if (this.Authorization) {
            let r = await fetch(this.BaseURL + `1/submit-listens`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { Authorization: 'Token ' + this.Authorization }
            });
            if (r.status === 200) {
                return {status: 200};
            }
            else if (r.status === 400) {
                throw JSON.stringify(await r.json());
            }
            else if (r.status === 401) {
                throw JSON.stringify(await r.json());
            }
            else {
                throw JSON.stringify(await r.json());
            }
        }
    }
}