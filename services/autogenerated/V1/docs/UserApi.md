# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getSingle**](#getsingle) | **GET** /api/v1.0/user/get-single | |
|[**setTimeZone**](#settimezone) | **POST** /api/v1.0/user/set-time-zone | |

# **getSingle**
> APIDaneyModelsAuthGetTokenResponse getSingle()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userID: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.getSingle(
    userID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userID** | [**number**] |  | (optional) defaults to undefined|


### Return type

**APIDaneyModelsAuthGetTokenResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **setTimeZone**
> APIDaneyModelsAuthGetTokenResponse setTimeZone()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userID: number; // (optional) (default to undefined)
let timezone: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.setTimeZone(
    userID,
    timezone
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userID** | [**number**] |  | (optional) defaults to undefined|
| **timezone** | [**number**] |  | (optional) defaults to undefined|


### Return type

**APIDaneyModelsAuthGetTokenResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

