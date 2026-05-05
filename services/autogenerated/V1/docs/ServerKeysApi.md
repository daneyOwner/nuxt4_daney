# ServerKeysApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getValues**](#getvalues) | **GET** /api/v1.0/serverkeys/get-values | |
|[**update**](#update) | **PUT** /api/v1.0/serverkeys/update | |
|[**upsertall**](#upsertall) | **PUT** /api/v1.0/serverkeys/upsertall | |

# **getValues**
> Array<APIDaneyRepositoriesEntitiesServerKey> getValues()


### Example

```typescript
import {
    ServerKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ServerKeysApi(configuration);

let guildID: number; // (optional) (default to undefined)
let request_body: Array<string>; // (optional)

const { status, data } = await apiInstance.getValues(
    guildID,
    request_body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request_body** | **Array<string>**|  | |
| **guildID** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<APIDaneyRepositoriesEntitiesServerKey>**

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

# **update**
> update()


### Example

```typescript
import {
    ServerKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ServerKeysApi(configuration);

let guildID: number; // (optional) (default to undefined)
let uid: string; // (optional) (default to undefined)
let value: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.update(
    guildID,
    uid,
    value
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guildID** | [**number**] |  | (optional) defaults to undefined|
| **uid** | [**string**] |  | (optional) defaults to undefined|
| **value** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **upsertall**
> upsertall()


### Example

```typescript
import {
    ServerKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ServerKeysApi(configuration);

let guildID: number; // (optional) (default to undefined)
let APIDaneyRepositoriesEntitiesServerKeyRequester: Array<APIDaneyRepositoriesEntitiesServerKeyRequester>; // (optional)

const { status, data } = await apiInstance.upsertall(
    guildID,
    APIDaneyRepositoriesEntitiesServerKeyRequester
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **APIDaneyRepositoriesEntitiesServerKeyRequester** | **Array<APIDaneyRepositoriesEntitiesServerKeyRequester>**|  | |
| **guildID** | [**number**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

