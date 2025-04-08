export function random(len: number) {
  let options = "abcdefghijklmnopqrstuvwxyz0123456789";
  const lengthOfOptions = options.length;

  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * lengthOfOptions)];
  }
  return ans;
}
