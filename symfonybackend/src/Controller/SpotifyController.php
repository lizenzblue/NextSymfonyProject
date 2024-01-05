<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;

class SpotifyController extends AbstractController
{
    #[Route('/api/spotify', name: 'spotify')]
    public function index(Request $request): Response
    {

        $envData = $this->getSpotifyAuthData();
        $accessToken = $this->getAccessToken($envData);

        $searchQuery = $request->query->get('query', '');
        $selectedTab = $request->query->get('tab', '');

        $this->addFlash('search_query', $searchQuery);
        $this->addFlash('selected_tab', $selectedTab);

        $data = [
            'searchFor' => $selectedTab,
            'search_query' => $searchQuery,
        ];

        /*$data = [
            'searchFor' => "Artist",
            'search_query' => "edo",
        ];*/

        $apiResponse = $this->callSpotifyAPI($accessToken, $data);
        $returnData = null;
        switch($data["searchFor"]){
            case "Artist":
                $returnData = $this->getArtistInfo($apiResponse, $data['search_query']);
                break;
            case "Album":
                $returnData = $this->getAlbumInfo($apiResponse, $data['search_query']);
                break;
            case "Tracks":
                $returnData = $this->getTrackInfo($apiResponse, $data['search_query']);
                break;
        }
        return $this->json([
            'returnData' => $returnData,
        ]);
    }

    private function getSpotifyAuthData()
    {
        $dotenv = new Dotenv();
        $dotenv->load($this->getParameter('kernel.project_dir').'/src/Controller/.env');
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
        switch($data["searchFor"]){
            case "Artist":
                $url = 'https://api.spotify.com/v1/search?q=' . $data["search_query"] . '&type=artist&limit=10';
                break;
            case "Album":
                $url = 'https://api.spotify.com/v1/search?q=' . $data["search_query"] . '&type=album&limit=10';
                break;
            case "Tracks":
                $url = 'https://api.spotify.com/v1/search?q=' . $data["search_query"] . '&type=track&limit=10';
                break;
        }
       
        $response = $client->get($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken['access_token'],
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    private function checkIfArrayContainsDoubles($data)
    {
        $uniqueData = [];

        foreach ($data as $key => $item) {
            if($key == 'type'){
                continue;
            }
            if($data['type'] == 'artist'){
                $name = $item['name'];
            } else if($data['type'] == 'album'){
                $name = $item['name'];
            } else if($data['type'] == 'track'){
                $name = $item['name'];
            }
            
            if (!isset($uniqueData[$name])) {
                $uniqueData[$name] = $item;
            }
        }
        
        return array_values($uniqueData);
    }

    private function getArtistInfo($artistsArray, $q)
    {
        $artistData = [
            'type' => 'artist',
        ];
        foreach ($artistsArray['artists']['items'] as $artist) {
            $image = $artist['images'][0]['url'] ?? '';
            $name = $artist['name'] ?? '';
            $popularity = $artist['popularity'] ?? 0;
            $spotifyUrl = $artist['external_urls']['spotify'] ?? '';
            $genres = $artist['genres'] ?? [];
            if(str_contains(strtolower($name), strtolower($q))){
                $artistData[] = [
                    'image' => $image,
                    'name' => $name,
                    'popularity' => $popularity,
                    'spotifyUrl' => $spotifyUrl,
                    'genres' => $genres,
                ];
            }
        }
        $artistData = $this->checkIfArrayContainsDoubles($artistData);
        return $artistData;
    }

    private function getAlbumInfo($apiResponse, $q)
    {
        $albumDetails = [
            'type' => 'album',
        ];
        foreach ($apiResponse['albums']['items'] as $album) {
            if(str_contains(strtolower($album['name']), strtolower($q))){
                $albumArtistName = $album['artists'][0]['name'];
                $albumDetails[] = [
                    'name' => $album['name'],
                    'artist' => $albumArtistName,
                    'album_type' => $album['album_type'],
                    'release_date' => $album['release_date'],
                    'spotify_url' => $album['external_urls']['spotify'],
                    'cover' => isset($album['images'][0]['url']) ? $album['images'][0]['url'] : null,
                    'available_markets' => $album['available_markets'],
                ];
            }
        }
        $albumDetails = $this->checkIfArrayContainsDoubles($albumDetails);
        return $albumDetails;
    }

    private function getTrackInfo($apiResponse, $q)
    {
        $trackDetails = [
            'type' => 'track',
        ];
        foreach ($apiResponse['tracks']['items'] as $track) {
            if(str_contains(strtolower($track['name']), strtolower($q))){
                $trackDetails[] = [
                    'name' => $track['name'],
                    'artist' => $track['artists'][0]['name'],
                    'album' => $track['album']['name'],
                    'spotify_url' => $track['external_urls']['spotify'],
                    'cover' => isset($track['album']['images'][0]['url']) ? $track['album']['images'][0]['url'] : null,
                    'preview_url' => $track['preview_url'],
                ];
            }
        }

        $trackDetails = $this->checkIfArrayContainsDoubles($trackDetails);
        dd($trackDetails);
        return $trackDetails;
    }
}