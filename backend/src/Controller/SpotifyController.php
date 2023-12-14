<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;
use Symfony\Component\Dotenv\Dotenv;

class SpotifyController extends AbstractController
{
    #[Route('/api/spotify/artist', name: 'spotifyArtist')]
    public function index(): Response
    {
        $envData = $this->getSpotifyAuthData();
        return $this->json([
            'data' => $envData,
        ]);
    }

    private function getSpotifyAuthData()
    {
        $dotenv = new Dotenv();
        $dotenv->load($this->getParameter('kernel.project_dir').'/.env');
        $envData = [
            'SPOTIFY_CLIENT_ID' => $_ENV['SPOTIFY_CLIENT_ID'],
            'SPOTIFY_CLIENT_SECRET' => $_ENV['SPOTIFY_CLIENT_SECRET'],
        ];
        return $envData;
    }

    private function getAccessToken($envData)
    {
        $client = new Client();


        $response = $client->post('https://accounts.spotify.com/api/token', [
            'form_params' => [
                'grant_type' => 'client_credentials',
                'client_id' => $envData['SPOTIFY_CLIENT_ID'],
                'client_secret' => $envData['SPOTIFY_CLIENT_SECRET'],
            ],
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    private function callSpotifyAPI($accessToken, $data)
    {
        $client = new Client();
        $url = "";
        if($data["searchFor"] == "artist"){
            $url = 'https://api.spotify.com/v1/search?q=' . urlencode($data["artistName"]) . '&type=artist';
        } else {
            $url = 'https://api.spotify.com/v1/search?q=' . urlencode($data["albumName"]) . '&type=album';
        }
       
        $response = $client->get($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken['access_token'],
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getArtistInfo($artistsArray, $artistName)
    {
        if (isset($artistsArray['artists']) && isset($artistsArray['artists']['items'][0])) {
            foreach ($artistsArray['artists']['items'] as $artist) {
                if (isset($artist['name']) && strcasecmp($artist['name'], $artistName) === 0) {
                    $image = $artist['images'][0]['url'] ?? '';
                    $name = $artist['name'] ?? '';
                    $popularity = $artist['popularity'] ?? 0;
                    $spotifyUrl = $artist['external_urls']['spotify'] ?? '';

                    return [
                        'image' => $image,
                        'name' => $name,
                        'popularity' => $popularity,
                        'spotifyUrl' => $spotifyUrl,
                    ];
                }
            }
        }

        return null;
    }

    private function findAlbumByArtist($apiResponse, $data)
    {
        foreach ($apiResponse['albums']['items'] as $album) {
            $albumArtistName = $album['artists'][0]['name'];

            if(!empty($data['artistName'])){
                if ($albumArtistName == $data['artistName']) {
                    $albumDetails = [
                        'title' => $album['name'],
                        'artist' => $albumArtistName,
                        'album_type' => $album['album_type'],
                        'release_date' => $album['release_date'],
                        'spotify_url' => $album['external_urls']['spotify'],
                        'cover' => isset($album['images'][0]['url']) ? $album['images'][0]['url'] : null,
                        'available_markets' => $album['available_markets'],
                    ];
        
                    return $albumDetails;
                }
                continue;
            }
        }
        return null;
    }
    
    
    
    // This function checks what field the user wants to search for
    private function checkWhatToSearchFor($data){
        if($data["artist"] != "" && $data["album"] == ""){
            return ["searchFor" => "artist", "artistName" => $data["artist"]];
        }
        return ["searchFor" => "album", "albumName" => $data["album"], "artistName" => $data["artist"]];
    }
}