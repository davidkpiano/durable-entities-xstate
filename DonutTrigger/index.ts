import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as df from 'durable-functions';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { id } = req.query;

  if (!id) {
    context.res = {
      status: 400,
      body: 'Missing id',
    };

    return;
  }

  const client = df.getClient(context);
  const entityId = new df.EntityId('DonutEntity', id);

  switch (req.method) {
    case 'POST': {
      const eventObject = req.body;

      await client.signalEntity(entityId, 'send', eventObject);

      context.res = {
        body: `Event "${eventObject.type}" sent to entity "${id}".`,
      };

      return;
    }
    case 'GET': {
      const stateResponse = await client.readEntityState(entityId);

      context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(stateResponse),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return;
    }
  }
};

export default httpTrigger;
