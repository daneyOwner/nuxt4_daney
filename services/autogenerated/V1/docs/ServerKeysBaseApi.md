# ServerKeysBaseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAll**](#getall) | **POST** /api/v1.0/serverkeysbase/get-all | |

# **getAll**
> Array<APIDaneyModelsServerKeysServerKeyModel> getAll()


### Example

```typescript
import {
    ServerKeysBaseApi,
    Configuration,
    APIDaneyControllersServerKeyRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ServerKeysBaseApi(configuration);

let APIDaneyControllersServerKeyRequest: APIDaneyControllersServerKeyRequest; // (optional)

const { status, data } = await apiInstance.getAll(
    APIDaneyControllersServerKeyRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **APIDaneyControllersServerKeyRequest** | **APIDaneyControllersServerKeyRequest**|  | |


### Return type

**Array<APIDaneyModelsServerKeysServerKeyModel>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

