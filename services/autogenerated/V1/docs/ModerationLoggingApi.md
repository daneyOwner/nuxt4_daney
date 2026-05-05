# ModerationLoggingApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getPaged**](#getpaged) | **GET** /api/v1.0/moderationlogging/get-paged | |

# **getPaged**
> APIDaneySharedModelsPagedListOfDaneyDataAccessEntitiesModerationLogging getPaged()


### Example

```typescript
import {
    ModerationLoggingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ModerationLoggingApi(configuration);

let guildID: number; // (optional) (default to undefined)
let type: number; // (optional) (default to undefined)
let sort: string; // (optional) (default to undefined)
let order: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let offset: number; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getPaged(
    guildID,
    type,
    sort,
    order,
    limit,
    offset,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guildID** | [**number**] |  | (optional) defaults to undefined|
| **type** | [**number**] |  | (optional) defaults to undefined|
| **sort** | [**string**] |  | (optional) defaults to undefined|
| **order** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **offset** | [**number**] |  | (optional) defaults to undefined|
| **search** | [**string**] |  | (optional) defaults to undefined|


### Return type

**APIDaneySharedModelsPagedListOfDaneyDataAccessEntitiesModerationLogging**

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

