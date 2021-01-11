package io.itrunner.heroes;

import io.itrunner.heroes.data.HeroService;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.rpc.*;

import java.util.HashMap;
import java.util.Map;

import static ohos.utils.zson.ZSONObject.toZSONString;

public class HeroServiceAbility extends Ability {
    private static final String TAG = HeroServiceAbility.class.getSimpleName();
    private static final HiLogLabel LOG_LABEL = new HiLogLabel(HiLog.LOG_APP, 0x00102, TAG);

    private HeroRemote remote = new HeroRemote();

    private HeroService service = new HeroService(this);

    @Override
    protected void onStart(Intent intent) {
        HiLog.info(LOG_LABEL, "onStart");
        super.onStart(intent);
    }

    @Override
    public IRemoteObject onConnect(Intent intent) {
        HiLog.info(LOG_LABEL, "onConnect");
        super.onConnect(intent);
        return remote.asObject();
    }

    class HeroRemote extends RemoteObject implements IRemoteBroker {
        private static final int ERROR = -1;
        private static final int SUCCESS = 0;

        HeroRemote() {
            super("HeroRemote");
        }

        @Override
        public boolean sendRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) throws RemoteException {
            return super.sendRequest(code, data, reply, option);
        }

        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
            HiLog.info(LOG_LABEL, "onRemoteRequest");
            Map<String, Object> zsonResult = new HashMap<>();
            try {
                Object result = service.onRemoteRequest(code, data);

                zsonResult.put("code", SUCCESS);
                if (result != null) {
                    zsonResult.put("result", result);
                }
                reply.writeString(toZSONString(zsonResult));
                return true;
            } catch (Exception e) {
                HiLog.error(LOG_LABEL, e.getMessage());

                zsonResult.put("code", ERROR);
                zsonResult.put("message", e.getMessage());
                reply.writeString(toZSONString(zsonResult));
                return false;
            }
        }

        @Override
        public IRemoteObject asObject() {
            return this;
        }
    }
}