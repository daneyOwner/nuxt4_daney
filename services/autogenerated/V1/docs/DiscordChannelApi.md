# DiscordChannelApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getChannels**](#getchannels) | **GET** /api/v1.0/discordchannel/get-channels | |

# **getChannels**
> Array<APIDaneyModelsCommonSelectItem> getChannels()


### Example

```typescript
import {
    DiscordChannelApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscordChannelApi(configuration);

let guildID: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.getChannels(
    guildID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guildID** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<APIDaneyModelsCommonSelectItem>**

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

