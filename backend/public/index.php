<?php
declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use PagarMe\Client as PagarmeClient;

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, array $args) {
    $products = [
		[
			'id' => 'xpto1',
			'image' => 'http://localhost:8080/image/product1.jpg',
			'name' => 'Curso de navegação mobile',
			'price' => '60'
		],
		[
			'id' => 'xpto2',
			'image' => 'http://localhost:8080/image/product2.jpg',
			'name' => 'Introdução à Python',
			'price' => '75'
		],
		[
			'id' => 'xpto3',
			'image' => 'http://localhost:8080/image/product3.jpg',
			'name' => 'Curso de fotografia',
			'price' => '25'
		],
		[
			'id' => 'xpto4',
			'image' => 'http://localhost:8080/image/product4.jpg',
			'name' => 'Sketchup mobile apps',
			'price' => '50'
		]
	];

	$payload = json_encode($products);

	$response->getBody()->write($payload);

	return $response->withHeader('Content-Type', 'application/json');
});


$app->get('/image/{name}', function (Request $request, Response $response, array $args) {
	$name = $args['name'];

	$file = __DIR__  . "/" . $name;

    if (!file_exists($file)) {
        die("file:$file");
	}
	
	$image = file_get_contents($file);
	
    if ($image === false) {
        die("error getting image");
	}
	
	$response->getBody()->write($image);
	
    return $response->withHeader('Content-Type', 'image/png');
});

$app->post('/checkout', function(Request $request, Response $response, array $args) {

	$params = (array)$request->getParsedBody();

	$totalammount = $params['shipping'];

	$itemsData = [];
	foreach($params['products'] as $product) {
		$totalammount += $product['price'];

		$itemsData[] = [
			'id' => $product['id'],
			'title' => $product['name'],
			'unit_price' => (int)($product['price'] . '00'),
			'quantity' => 1,
			'tangible' => true
		];
	}

	// Remove os dois primeiros digitos do ano.
	$params['user']['card_year'] = substr($params['user']['card_year'], 2, 2);


	$expirationDate = $params['user']['card_month'] . $params['user']['card_year'];

	// Adiciona dois zeros relativos aos centavos do pagarme.
	$totalammount = (int)($totalammount . '00');

	$transactionData = [
		'amount' => $totalammount,
		'payment_method' => 'credit_card',
		'card_holder_name' => $params['user']['name'],
		'card_cvv' => $params['user']['card_cvc'],
		'card_number' => $params['user']['card_number'],
		'card_expiration_date' => $params['user']['card_month'] . $params['user']['card_year'],
		'customer' => [
			'external_id' => uniqid("", true),
			'name' => $params['user']['name'],
			'type' => 'individual',
			'country' => 'br',
			'documents' => [
			  [
				'type' => 'cpf',
				'number' => $params['user']['cpf']
			  ]
			],
			'phone_numbers' => [ '+5598992231059' ],
			'email' => $params['user']['email']
		],
		'billing' => [
			'name' => $params['user']['name'],
			'address' => [
			  'country' => 'br',
			  'street' => $params['user']['address'],
			  'street_number' => $params['user']['number'],
			  'state' => strtolower($params['user']['state']),
			  'city' => $params['user']['city'],
			  'neighborhood' => $params['user']['neighborhood'],
			  'zipcode' => $params['user']['zipcode']
			]
		],
		'shipping' => [
			'name' => $params['user']['name'],
			'fee' => (int)($params['shipping'] . '00'),
			'delivery_date' => date('Y-m-d'),
			'expedited' => false,
			'address' => [
			  'country' => 'br',
			  'street' => $params['user']['address'],
			  'street_number' => $params['user']['number'],
			  'state' => strtolower($params['user']['state']),
			  'city' => $params['user']['city'],
			  'neighborhood' => $params['user']['neighborhood'],
			  'zipcode' => $params['user']['zipcode']
			]
		],
		'items' => $itemsData
	];

	$pagarme = new PagarmeClient('ak_test_4JLvCFR7vKpxcgKvGIqIugAYm8d8kp');	

	$transaction = $pagarme->transactions()->create($transactionData);

	if ($transaction->status == 'paid') {
		$data = [
			'transaction' => $transaction->id,
			'shipping' => uniqid("", true)
		];

		$response->getBody()->write(json_encode($data));
	} else {
		$response->getBody()->write('error');
	}

    return $response->withHeader('Content-Type', 'application/json');
});

// CORS SETUP
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$jsonMiddleware = function (Request $request, RequestHandler $handler) {
	$contentType = $request->getHeaderLine('Content-Type');

	if (strstr($contentType, 'application/json')) {
		$contents = json_decode(file_get_contents('php://input'), true);
		if (json_last_error() === JSON_ERROR_NONE) {
			$request = $request->withParsedBody($contents);
		}
	}

	return $handler->handle($request);
};

$app->add($jsonMiddleware);

$app->run();