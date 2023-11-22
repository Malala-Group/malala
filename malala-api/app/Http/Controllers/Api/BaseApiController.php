<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseApiController extends Controller
{
    protected function jsonResponse($status, $message = null, $data = null, $statusCode = 200)
    {
        $response = [
            'status' => $status,
            'message' => $message,
        ];

        if (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    protected function handleException(\Exception $e, $defaultMessage = 'Terjadi kesalahan dalam proses pengambilan data.')
    {
        $statusCode = $e->getCode() ?: 500;
        $message = $e->getMessage() ?: $defaultMessage;

        return $this->jsonResponse('fail', $message, null, $statusCode);
    }
}
