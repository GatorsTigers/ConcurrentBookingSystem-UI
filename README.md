Sometimes react native will not be able to connect to xCode. Run this command to fix it:

sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

There's a sort of "global variable" (likely an environment variable I would guess) at the system level pointing to the current XCode installation, and that isn't being set by the XCode installer. Expo is likely looking this "global variable" up, seeing that it isn't set, and assuming that XCode isn't installed.